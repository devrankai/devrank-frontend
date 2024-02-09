type Props = {
  linkedInImg: string;
}

export const Profile = ({ linkedInImg }: Props) => {
  return (
    <img
      width="280"
      src={linkedInImg}
      alt="LinkedIn profile image"
    />
  )
}