import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/BlogPost.module.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import * as fs from 'fs';

//Step1: Find the file corresponding to the slug
// Step 2:Populate them inside the <page></page>
const inter = Inter({ subsets: ['latin'] })
const Slug = (props) => {

  function createMarkup(c) {
    return {__html: c};
  }

  const [blog, setBlog] = useState(props.myblog);
  return (
    <div>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>{blog && blog.title}</h1>
        <hr></hr>
        { blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)} className={styles.blogdiv}></div>}
      </main>
    </div>
  )
};



//-------------------------------Server Side rendering-------------------------
// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   // const router = useRouter();
//   // console.log(context);
//   const { slug } = context.query;
//   let data=await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//   let myblog=await data.json()
//   // Pass data to the page via props
//   return { props: { myblog }, }
// }

//-------------------------------Static Site rendering-------------------------
export async function getStaticPaths(){
  return {
    paths: [
      { params: { slug:'how-to-learn-js' } },
       { params: { slug:'how-to-learn-nextjs' } },
       { params: { slug:'how-to-learn-nodejs' } },
      // See the "paths" section below
    ],
    fallback: true, // false or "blocking"
  };
}


export async function getStaticProps(context) {
  // Fetch data from external API
  // const router = useRouter();
  // console.log(context);
  const { slug } = context.params;
  
  let myblog=await fs.promises.readFile(`blogdata/${slug}.json`,'utf-8')
    // console.log(req.query); 
   
  // Pass data to the page via props
  return { props: { myblog:JSON.parse(myblog) }, }
}
export default Slug