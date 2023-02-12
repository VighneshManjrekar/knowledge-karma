import { getResources } from "../../http/index"



// Get Resources
const getFResources = async () => {
    const response = await getResources()
    return response.data.data
}



const productService = {
    getFResources
}

export default productService