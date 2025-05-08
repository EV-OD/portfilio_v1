import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { getCollection } from "astro:content";

export const categories = {
    filterByCategory: defineAction({
        input: z.object({
            category: z.string()
        }),
        handler: async ({ category }) => {

            const articles = []

            const allArticles = await getCollection("articles");
            
            if (category === "all") {
                articles.push(...allArticles);
                return { success: true, articles };
            }

            const filteredArticles = allArticles.filter((article) => article.data.category.toLowerCase() === category.toLowerCase());

            articles.push(...filteredArticles);

            return { success: true, articles};
        }
    })
};