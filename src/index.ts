import { loginMenu } from "./menu/loginMenu";
import "./server/Server";

async function main() {
    await loginMenu();
}

main();