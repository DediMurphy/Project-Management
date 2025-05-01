import prisma from "../db/index.js";


const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (id) => {
  if (typeof id != "number") {
    throw Error("Id is not number");
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProduct) => {
    const product = await prisma.product.create({
        data: {
          name: newProduct.name,
          price: newProduct.price,
          desciprtion: newProduct.desciprtion,
          image: newProduct.image,
        },
      });
      
      return product;
}

const deleteProduct = async (id) => {
    if (typeof id != 'number') {
        throw new Error("Id not Number");        
    } 
    await getProductById(id);
    const product = await prisma.product.delete({
        where: {
          id,
        },
    });

    if (!product) {
        throw Error("Product not found")
    }
    
      return product;
}

const editProductbyId = async (id, products) => {
    await getProductById(id);
      const product = await prisma.product.update({
        where: {
          id
        },
        data: {
          name: products.name,
          price: products.price,
          desciprtion: products.desciprtion,
          image: products.image,
        },
      });
    
      return product;
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  editProductbyId,
};
