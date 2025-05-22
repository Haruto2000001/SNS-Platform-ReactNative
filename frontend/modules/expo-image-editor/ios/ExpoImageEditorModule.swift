import ExpoModulesCore
import UIKit


public class ExpoImageEditorModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoImageEditor')` in JavaScript.
    Name("ExpoImageEditor")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    AsyncFunction("cropCircle") { (base64Image: String) in
      print("🌀 start processing base64 image")
      guard let imageData = Data(base64Encoded: base64Image) else {
        // base64 -> Image
        print("❌ base64 decode failed")
        throw NSError(domain: "ImageModule", code: 400, userInfo: [NSLocalizedDescriptionKey: "Base64 decode failed"])
      }
      print("✅ Decoded base64 to imageData: \(imageData.count) bytes")
      guard let image = UIImage(data: imageData) else {
        //　image -> UIImage
        print("❌ UIImage init failed")
        throw NSError(domain: "ImageModule", code: 401, userInfo: [NSLocalizedDescriptionKey: "UIImage init failed"])
      }
      print("✅ Created UIImage: size = \(image.size.width)x\(image.size.height)")
      guard let filteredImage = applyCircularCrop(to: image) else {
        // Apply Filter UIImage -> UIImage
        print("❌ Failed to apply gray filter")
        throw NSError(domain: "ImageModule", code: 500, userInfo: [NSLocalizedDescriptionKey: "Filter failed"])
      }
      print("✅ Filter applied")
      guard let resultData = filteredImage.pngData() else {
        // Get PNG
        print("❌ pngData failed")
        throw NSError(domain: "ImageModule", code: 501, userInfo: [NSLocalizedDescriptionKey: "PNG conversion failed"])
      }
      print("✅ Converted filtered image to PNG")
      let base64Result = resultData.base64EncodedString() // PNG to base64
      print("✅ Encoded PNG to base64: length = \(base64Result.count)")
      return base64Result
    }

    
  }
}

func applyCircularCrop(to image: UIImage) -> UIImage? {
  let context = CIContext()
  guard let ciImage = CIImage(image: image) else {
    print("❌ Failed to create CIImage from UIImage")
    return nil
  }
  print("✅ CIImage created successfully: \(ciImage.extent.size)")
  // 画像のサイズを取得
  let imageSize = ciImage.extent.size
  let diameter = min(imageSize.width, imageSize.height)
  let center = CGPoint(x: imageSize.width / 4 - 85, y: (imageSize.height / 4) * 3 + 85)
  print("✅ Image size: \(imageSize.width) x \(imageSize.height), diameter: \(diameter), center: \(center)")
  // 半径と円形のマスクを作成
  let radius = CGFloat(170)
  let maskImage = createCircularMaskImage(diameter: diameter, radius: radius, center: center).cropped(to: ciImage.extent)
  // マスク画像を適用
  guard let maskFilter = CIFilter(name: "CIBlendWithAlphaMask") else {
    print("❌ Failed to create CIFilter 'CIBlendWithAlphaMask'")
    return nil
  }
  maskFilter.setValue(ciImage, forKey: kCIInputImageKey)
  maskFilter.setValue(maskImage, forKey: kCIInputMaskImageKey)
  guard let outputImage = maskFilter.outputImage else {
    print("❌ Failed to apply mask")
    return nil
  }
  print("✅ Mask applied successfully, output image size: \(outputImage.extent.size)")
  guard let cgImage = context.createCGImage(outputImage, from: outputImage.extent) else {
    print("❌ Failed to create CGImage from outputImage")
    return nil
  }
  print("✅ CGImage created successfully")
  return UIImage(cgImage: cgImage)
}

func createCircularMaskImage(diameter: CGFloat, radius: CGFloat, center: CGPoint) -> CIImage {
  // 円形マスクを作成するためにアルファチャネルを持つ画像を作成
  let size = CGSize(width: diameter, height: diameter)
  print("createCircularMaskImage d: \(diameter), r: \(radius), c: \(center) s: \(size)")
  UIGraphicsBeginImageContextWithOptions(size, false, 0)
  guard let context = UIGraphicsGetCurrentContext() else {
    fatalError("Failed to create graphics context")
  }
  // 透明な背景を設定
  context.setFillColor(UIColor.clear.cgColor)
  context.fill(CGRect(origin: .zero, size: size))
  // 円を描画
  context.setFillColor(UIColor.white.cgColor)
  context.addArc(center: center, radius: radius, startAngle: 0, endAngle: 2 * .pi, clockwise: true)
  context.fillPath()
  // UIImageとして取得
  guard let image = UIGraphicsGetImageFromCurrentImageContext() else {
    fatalError("Failed to create image from context")
  }
  UIGraphicsEndImageContext()
  return CIImage(image: image)!
}