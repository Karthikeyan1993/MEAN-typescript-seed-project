import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';
import { Http, RequestOptions, Headers, Response, ResponseOptions } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';

describe('HttpClientService', () => {
  let fixture: HttpClientService;
  let http: Http;
  let options: RequestOptions;
  let backend: MockBackend;
  let responseObject: any;
  let cookie: CookieService;
  let userService: UserService;
  let user: User;

  beforeEach(() => {
    backend = new MockBackend();
    options = new RequestOptions();
    options.headers = new Headers();
    http = new Http(backend, new RequestOptions());
    fixture = new HttpClientService(http);
  });

  describe('get method', () => {
    responseObject = { 'test': 123 };
    let requestHeaders: Headers;
    let requestUrl: string;
    beforeEach(() => {
      (<jasmine.Spy>userService.getUser).and.returnValue(user);
      backend.connections.subscribe((connection: MockConnection) => {
        requestHeaders = connection.request.headers;
        requestUrl = connection.request.url;

        let responseOptions = new ResponseOptions();
        responseOptions.headers = new Headers();
        connection.mockRespond(new Response(new ResponseOptions({
          body: responseObject,
          headers: responseOptions.headers
        })));
      });
    });

    afterEach(() => {
      backend.resolveAllConnections();
      backend.verifyNoPendingRequests();
    });

    it('should call http.get() with proper URL and use existing RequestOptions', () => {
      let response = fixture.get('/test/123', options);
      response.subscribe((res: Response) => {
        expect(res.json()).toEqual(responseObject);
        expect(requestHeaders).toBeDefined();
        expect(requestHeaders.get('Content-Type')).toEqual('application/json');
        expect(requestHeaders.get('Accept')).toEqual('application/json, text/plain, */*');
        expect(requestUrl).toEqual('/test/123');
      });
    });

    it('should call http.get() with proper URL and create new RequestOptions', () => {
      options.headers.set('this-one', 'should not be here');
      let response = fixture.get('/test/123');
      response.subscribe((res: Response) => {
        expect(res.json()).toEqual(responseObject);
        expect(requestHeaders).toBeDefined();
        expect(requestHeaders).not.toEqual(options.headers);
        expect(requestHeaders.get('Content-Type')).toEqual('application/json');
        expect(requestHeaders.get('Accept')).toEqual('application/json, text/plain, */*');
        expect(requestUrl).toEqual('/test/123');
      });
    });
  });
});
