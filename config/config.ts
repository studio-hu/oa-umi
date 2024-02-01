import {defineConfig} from '@umijs/max';
import routes from "./routes";

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    dva: {},
    initialState: {},
    request: {},
    layout: {
        title: '小胡工作室',
        local: false
    },
    routes: routes,
    npmClient: 'yarn',
});

