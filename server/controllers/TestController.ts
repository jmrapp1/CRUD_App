import { BodyParam, Get, JsonController, Post, Res, UseBefore } from "routing-controllers";
import HeaderMiddleware from './middleware/HeaderMiddleware';
import TestService from '../services/TestService';

@JsonController()
@UseBefore(HeaderMiddleware)
export default class UserController {

    @Get("/test")
    get(@Res() response: any) {
        return response.json({ message: "Hello this is a test" });
    }

    @Post("/test")
    post(@BodyParam("message") message: String, @Res() res: any) {
        return res.json({ message: "You posted '" + message + "'" });
    }

    @Post("/create")
    createTest(@BodyParam("test") test: String, @Res() res: any) {
        if (test) {
            return TestService.createTest(test).then(result => {
                if (result) {
                    return res.sendStatus(200);
                } else {
                    return res.status(404).json({ error: "That test message has already been used" });
                }
            });
        }
        return res.status(404).json({ error: 'Please enter a test message' });
    }

}