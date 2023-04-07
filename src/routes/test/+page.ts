import { dev } from '$app/environment';
// import { getBooks, setBooks } from "$lib/stores/db";
// import type { Book } from '$types/index';
// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

// export async function load() {
//   try {
//     const books = await getBooks();
//     console.log("查询结果: ", books);
//     return {
//       props: {
//         books,
//       },
//     };
//   } catch (e) {
//     return {
//       status: 500,
//       error: new Error("Error Fetching Data From Firebase"),
//     };
//   }
// }
//
// export async function _setNew(params: Book) {
//   try {
//     const res = await setBooks(params);
//     return {
//       props: {
//         res,
//       },
//     };
//   } catch (e) {
//     return {
//       status: 500,
//       error: new Error("Error Set Data From Firebase"),
//     };
//   }
// }
