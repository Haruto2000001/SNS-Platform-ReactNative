import { defineConfig } from '@lingui/cli'

export default defineConfig({
  sourceLocale: 'en-US',
  locales: ['en-US', 'ja-JP'],
  catalogs: [
    {
      path: 'locales/{locale}/messages',
      include: ['src'],
    },
  ],
})
