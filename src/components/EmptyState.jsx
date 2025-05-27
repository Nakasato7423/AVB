import { Link } from "react-router-dom";

export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
      {icon}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500 mb-4">{message}</p>
      {action}
    </div>
  );
}