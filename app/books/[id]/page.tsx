type Props = { params: { id: string } };

export default function BookDetailPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Book ID: {params.id}</h1>
    </div>
  );
}
