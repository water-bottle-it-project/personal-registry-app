import { useRouter } from 'next/router';

const usePage = () => {
  const router = useRouter();

  const pageQuery = router.query.page;
  if (typeof pageQuery !== 'string') {
    return 1;
  }

  const x = Number(pageQuery);
  if (Number.isInteger(x) && x >= 1) {
    return x;
  }

  void router.replace({ pathname: '' }, undefined, { shallow: true });
  return 1;
};

export { usePage };
