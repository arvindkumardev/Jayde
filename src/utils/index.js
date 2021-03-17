import { ENV } from "react-native-dotenv";

const ENV_URLS = {'dev': 'http://ec2-52-91-165-234.compute-1.amazonaws.com', 'prod' : ''};
const ENDPOINT = ENV_URLS[ENV];

export {
    ENDPOINT
}