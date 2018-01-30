import { BodyParam, Get, JsonController, Post, Res, UseBefore } from "routing-controllers";
import HeaderMiddleware from './middleware/HeaderMiddleware';

@JsonController()
@UseBefore(HeaderMiddleware)
export default class UserController {

    @Get("/test")
    getAll(@Res() response: any) {
        return response.json({ message: "Hello this is a test" });
    }

    @Post("/test")
    post(@BodyParam("message") message: String, @Res() res: any) {
        return res.json({ message: "You posted '" + message + "'" });
    }

}