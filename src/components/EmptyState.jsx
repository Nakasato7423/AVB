export default function EmptyState({ title, message }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
