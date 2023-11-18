import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from 'rxjs/operators'
import { ResMessage } from "./resMessage";
import { ResCode } from "./resCode";
import { ResStatus } from "./resStauts";
import { Observable } from "rxjs";

const resMessage = new ResMessage();
const resStatus = new ResStatus();
const resCode = new ResCode();

interface Data<T>{
    data:T
}


class Msg{
    msg:"sdfdsf"
}

const msg = new Msg();

@Injectable()
export class Response<T> implements NestInterceptor {
    intercept(ctx, next: CallHandler):Observable<Data<T>> {

        return next.handle().pipe(map(result => {

            if(result != null && result.msg){
                return {
                    data:result.data,
                    status: 1,
                    message: result.msg,
                    code: 200,
                    success: true
                }
            }else if(result === null){
                return {
                    data:{},
                    status: 1,
                    message: "成功",
                    code: 200,
                    success: true
                }
            }

            return {
                data:result,
                status: 1,
                message: "成功",
                code: 200,
                success: true
            }


        }))
    }

}

