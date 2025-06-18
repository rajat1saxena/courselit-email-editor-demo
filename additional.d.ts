declare module '@courselit/email-editor' {
  export { EmailEditor } from 'node_modules/@courselit/email-editor/dist/components/email-editor-root';
  export { renderEmailToHtml } from 'node_modules/@courselit/email-editor/dist/lib/email-renderer';
  export type { Email } from 'node_modules/@courselit/email-editor/dist/types/email-editor';
}
declare module '@courselit/email-editor/blocks' {
  export { Text, Link, Separator } from 'node_modules/@courselit/email-editor/dist/blocks';
} 