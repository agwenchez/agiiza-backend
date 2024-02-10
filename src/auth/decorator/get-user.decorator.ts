import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { JwtPayloadWithRt } from '../../auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    // console.log("User", request.user)
    return request.user[data];
  },
);
