import { NgModule } from "@angular/core";
import {
    RouterModule,
    Routes
} from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { ChatComponent } from "./chat/chat.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/courses",
        pathMatch: "full",
    },
    {
        path: "courses",
        loadChildren: () =>
            import("./courses/courses.module").then((m) => m.CoursesModule),
        // canLoad: [CanLoadAuthGuard]
        data: {
            preload: false,
        },
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "about",
        component: AboutComponent,
    },
    {
        path: "helpdesk-chat",
        component: ChatComponent,
        outlet: "chat",
    },
    {
        path: "**",
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: CustomPreloadingStrategy,
            enableTracing: false,
            useHash: false,
            scrollPositionRestoration: "enabled",
            paramsInheritanceStrategy: "always",

        }),
    ],
    exports: [RouterModule],
    providers: [CanLoadAuthGuard, CustomPreloadingStrategy],
})
export class AppRoutingModule { }
