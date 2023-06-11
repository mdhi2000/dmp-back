// import { Query, Document, Model } from 'mongoose';
// import * as mongoosePaginate from 'mongoose-paginate-v2';

// export function paginate<T extends Document>(
//   model: Model<T>,
//   query: Query<T[], T>,
// ): Query<T[], T> {
//   const page = parseInt(query['page'] as string) || 1;
//   const limit = parseInt(query['limit'] as string) || 10;

//   return model.paginate({}, { page, limit });
// }

// // Apply the pagination plugin to your Mongoose schema
// mongoosePaginate.paginate.options = {
//   lean: true, // Optional: If you prefer plain JavaScript objects instead of Mongoose documents
//   limit: 20, // Optional: Set a default limit value
// };
