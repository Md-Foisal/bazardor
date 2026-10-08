type Props = {
  name: string;
  image?: string | null;
  size?: string;
  text?: string;
};

// shows google/github photo, if not then first letter of name
export default function Avatar({ name, image, size = "size-9", text = "text-sm" }: Props) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        referrerPolicy="no-referrer"
        className={`${size} shrink-0 rounded-[10.5px] object-cover`}
      />
    );
  }

  return (
    <span
      className={`${size} ${text} grid shrink-0 place-items-center rounded-[10.5px] bg-primary font-bold text-primary-content`}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
