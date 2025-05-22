import { messages as messagesEnUS } from '@/locales/en-US/messages.po'
import { messages as messagesJaJP } from '@/locales/ja-JP/messages.po'
import { type Messages, i18n as linguiI18n } from '@lingui/core'

const messages: Record<string, Messages> = {
  'en-US': messagesEnUS,
  'ja-JP': messagesJaJP,
}

linguiI18n.load(messages)
linguiI18n.activate('en-US')

export const i18n = linguiI18n

export const activateLanguage = (locale: string) => {
  i18n.activate(locale)
}
