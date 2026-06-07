// Chrome DevTools auto-requests /.well-known/appspecific/com.chrome.devtools.json
// ("automatic workspace folders"). A file-based route can't live under a dot-dir
// (the scanner ignores it), so intercept it here and answer 204 No Content,
// preventing the request from falling through to the SPA / Vue Router (which warns).
export default defineEventHandler((event) => {
  if (
    import.meta.dev &&
    event.path.startsWith("/.well-known/appspecific/com.chrome.devtools.json")
  ) {
    return sendNoContent(event, 204);
  }
});
