import { GraphQLModule } from "@graphql-modules/core";
import { CommonModule } from "./common/common.module";
import { CommentModule } from "./Comment/Comment.module";
import { PostModule } from "./Post/Post.module";
import { GroupModule } from "./Group/Group.module";
import { UserModule } from "./User/User.module";

export const AppModule = new GraphQLModule({
  imports: [CommonModule, CommentModule, PostModule, GroupModule, UserModule],
});
