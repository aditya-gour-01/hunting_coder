import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const inter = Inter({ subsets: ['latin'] })

//Step1: Collect all the files from blogdata directory 
//Step2: Iterate through them and display them
const Blog = (props) => {
  // console.log(props)
  const [blogs, setBlogs] = useState(props.allblogs);
  const [count, setCount] = useState(2)
  const fetchData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 1}`)
    setCount(count + 1) 
    let data = await d.json()
    setBlogs(data)
  };


  return (
    <div className={styles.blogs}>
      <main className={`${styles.main} ${inter.className}`}>

        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >

          {blogs.map((blogItem) => {
            return <div key={blogItem.slug}>
              <Link href={`/blogpost/${blogItem.slug}`}>
                <h3 className={styles.itemp}>{blogItem.title}</h3></Link>
              <p className={styles.blogItemp}>{blogItem.metadesc.substr(0, 140)}....</p>
              <Link href={`/blogpost/${blogItem.slug}`}><button className={styles.btn}>Read More</button></Link>
            </div>
          })}
        </InfiniteScroll>



      </main>
    </div>
  )
};

//--------------------------Server Side generation ---------------------
// This gets called on every request
// export async function getServerSideProps(context) {
//   // Fetch data from external API
//     let data=await fetch('http://localhost:3000/api/blogs')
//     let allBlogs=await data.json()

//   // Pass data to the page via props
//   return { props: {allBlogs}, }
// }

//--------------------------Static Site generation ---------------------
export async function getStaticProps(context) {
  // Fetch data from external API
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allblogs = []
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    // console.log(item)
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    // console.log(myfile)
    allblogs.push(JSON.parse(myfile))
  }

  // Pass data to the page via props
  return { props: { allblogs, allCount }, }
}
export default Blog