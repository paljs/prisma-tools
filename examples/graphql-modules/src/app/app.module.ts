import { GraphQLModule } from "@graphql-modules/core";
import { CommonModule } from "./common/common.module";
import { PostModule } from "./Post/post.module";
import { UserModule } from "./User/user.module";

export const AppModule = new GraphQLModule({
  imports: [CommonModule, UserModule, PostModule],
});
