export default function personalProject({ params }) {
  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <h1>{params.name}</h1>
    </div>
  );
}
