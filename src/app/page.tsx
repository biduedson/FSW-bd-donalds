import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/prisma";

const HomePage = async () => {
  // Busca o primeiro restaurante no banco
  const restaurant = await db.restaurant.findFirst();

  if (!restaurant) {
    return notFound(); // Se não houver restaurante, exibe página 404
  }

  // Redireciona para a página do restaurante
  redirect(`/${restaurant.slug}`);
};

export default HomePage;
