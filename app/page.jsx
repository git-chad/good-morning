import dynamic from 'next/dynamic';

const DynamicP5Component = dynamic(() => import('./p5-component'), {
  ssr: false,  
  loading: () => <p>Loading...</p> 
});

function HomePage() {
  return <DynamicP5Component />;
}

export default HomePage;
