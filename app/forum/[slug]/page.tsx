type Props = { params: { slug: string } };

export default function ForumThreadPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Forum: {params.slug}</h1>
    </div>
  );
}
