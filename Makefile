.PHONY: start stop colima supa adb expo

# ===================
SHELL      := /bin/bash
.ONESHELL:

ADB_PORTS  := 443 54321
EMULATOR   := $(shell which emulator || echo $$ANDROID_HOME/emulator/emulator)
AVD        ?= $(shell "$(EMULATOR)" -list-avds | head -n 1)
# ===================

start: colima supa adb expo

colima:
	@if ! colima status >/dev/null 2>&1 ; then \
	  echo "▶ Starting Colima…" ; colima start ; \
	fi

supa:
	@echo "▶ Launching Supabase…"
	@(cd backend && supabase start)

status:
	@(cd backend && supabase status)

supaclean:
	@echo "▶ Removing old Supabase images…"
	@backend/clean-old-images.sh

adb:
	@echo "▶ Preparing Android device…"
	if [ "$$(adb devices | grep -w "device" | wc -l)" -eq 0 ]; then \
	  if [ -z "$(AVD)" ]; then \
	    echo "❌ No AVD found. Please create one with Android Studio or avdmanager." ; exit 1 ; \
	  fi ; \
	  echo "  • Booting AVD '$(AVD)'…" ; \
	  "$(EMULATOR)" @$(AVD) -no-snapshot -netdelay none -netspeed full & \
	fi ; \
	until adb wait-for-device >/dev/null 2>&1 ; do sleep 1 ; done ; \
	adb root || true ; adb wait-for-device ; \
	for p in $(ADB_PORTS) ; do adb reverse tcp:$$p tcp:$$p || true ; done

expo:
	@echo "▶ Starting Expo Dev Server… (press a/i/w in the CLI to launch Android/iOS/Web)"
	cd frontend && bun run dev

stop:
	@(cd backend && supabase stop)
	@for p in $(ADB_PORTS) ; do adb reverse --remove tcp:$$p || true ; done
	@echo "🛑 すべて停止しました"
