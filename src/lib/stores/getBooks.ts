import { getBooks } from "$lib/stores/db";
export async function load() {
  try {
    const books = await getBooks();
    console.log("查询结果: ", books);
    return {
      props: {
        books,
      },
    };
  } catch (e) {
    return {
      status: 500,
      error: new Error("Error Fetching Data From Firebase"),
    };
  }
}
