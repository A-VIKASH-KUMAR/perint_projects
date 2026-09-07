import {Link} from "react-router-dom";
export const Error = ({ message }: { message: string }) => {
  return (
    <div className="p-6 flex flex-col items-center">
      <p className="text-red-500 mb-4">{message}</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Back to products
      </Link>
    </div>
  );
}