import SEO from '../../components/SEO';
import MdxCard from '../../components/MdxCard';

<SEO title="Nexus features" />

<MdxCard>

### Features

- Auto generate CRUD system from your `schema.prisma` file.
  - **Every model will have folder contain 10 files:**
    - You can customize all this files and add your logic code inside it just `User/type.ts` will rewrite on it.
    - `User/mutations/createOne.ts`
    - `User/mutations/deleteOne.ts`
    - `User/mutations/updateOne.ts`
    - `User/mutations/upsertOne.ts`
    - `User/mutations/deleteMany.ts`
    - `User/mutations/updateMany.ts`
    - `User/queries/findCount.ts`
    - `User/queries/findMany.ts`
    - `User/queries/findOne.ts`
    - `User/type.ts`
  - Add to **_inputTypes.ts_** file list of inputs:
    - `UserWhereInput`
    - `UserWhereUniqueInput`
    - `UserOrderByInput`
    - `UserCreateInput`
    - `UserUpdateInput`
    - `UserUpdateManyMutationInput`

* Has [nexus plugin](/select) to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this help in these points :-
  - Good solution for `N + 1 issue`.
  - Save performance with just query what frontend request from db.
* Support two versions of `nexus`
  - [Nexus framework](/nexus/framework)
  - [Nexus schema](/nexus/schema)
* Add onDelete cascade function to workaround missing function in Prisma migrate Cli more information [here](/delete)
* You have options to exclude anything you want.
  - exclude queries or mutations file for all models.
  - exclude queries or mutations from custom models.
  - exclude fields from all models.
  - exclude fields from custom model.
  - For more options [Tool settings](/nexus/api)

</MdxCard>
