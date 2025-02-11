import { SharedOptions } from 'msw';

const sharedOptions: SharedOptions = {
  onUnhandledRequest: (request, print) => {
    const url = new URL(request.url);

    // Ignore requests to fetch for other files
    if (!url.pathname.includes('/api/')) return;

    // Otherwise, print a warning for any unhandled request.
    print.warning();
  }
};

export async function initMocks() {
  if (typeof window === 'undefined') {
    console.log('initMocks on server...!')
    const { server } = await import('./node')
    server.listen(sharedOptions)
  } else {
    console.log('initMocks on browser...!')
    const { worker } = await import('./browser')
    await worker.start(sharedOptions)
  }
}
