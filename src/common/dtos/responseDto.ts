export class ResponseDto<T> {
  statusCode: number;
  data: T;
  message?: string;
  url?: string;
  state:number;

  constructor( state:number=1,statusCode: number, data: T, message?: string, url?: string ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.url = url; 
    this.state = state;
  }
}