
export default function ErrorMessage({ message }) {
  return (
    <p className="message" data-state="error">
      {message}
    </p>
  );
}
