import { useRouter } from "next/router"
import ProductForm from "../../../components/ProductForm";
import { getAccessToken } from "@auth0/nextjs-auth0";

export default function ProductsPage(props: any) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <ProductForm shopId={id} accessToken={props.accessToken} />
  )
}  

export async function getServerSideProps(ctx: any) {
  const { accessToken } = await getAccessToken(ctx.req, ctx.res);  
  return {
    props: { 
      accessToken,
    }
  }
}