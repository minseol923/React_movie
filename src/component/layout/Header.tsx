import { useRouter } from 'next/router';

export interface Props {
  type?: string;
  title?: string;
}

const Header = ({ type, title }: Props) => {
  const router = useRouter();

  return (
    <header>
      <div>영화 검색 페이지</div>
    </header>
  );
};

export default Header;
