import { createProduct, deleteProduct, editProductbyId, getAllProducts, getProductById} from "../service/productService.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const product = await getAllProducts();

        res.send(product);   
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        const product = await getProductById(productId);

        res.send({
            data: product,
            message: "Berhasil",
        });   
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const product = await createProduct(newProduct);
        res.send({
            data: product,
            message: "Add product success product",
        });   
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await deleteProduct(productId);

    res.send("product delete");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (!(productData.image && productData.desciprtion && productData.name && productData.price)) {
    return res.status(400).send("Some fields are missing");
  }

  await prisma.product.update({
    where: {
      id: parseInt(productId),
    },
    data: {
      name: productData.name,
      price: productData.price,
      desciprtion: productData.desciprtion,
      image: productData.image,
    },
  });

  res.send({
    data: productData,
    message: "Completed update",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = req.body;

    await editProductbyId(productId, product); 

    res.send({
      data: product,
      message: "Completed update",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
