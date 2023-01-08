import styles from '~styles/Home.module.css'
import { useState, createElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRecipes } from '~hooks/useRecipes'
import { useRecipesAutocomplete } from '~hooks/useRecipesAutocomplete'
import { AutoComplete, List, Space, Spin, Input, Card } from 'antd'
import debounce from 'lodash/debounce'
import InfiniteScroll from 'react-infinite-scroll-component'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getRecipes } from '~lib/recipes'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

export default function Home({
  recipes: initialRecipes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchQuery, setSearch] = useState<string>('')

  const { data: autocompleteQueries } = useRecipesAutocomplete(searchQuery)
  const { recipes, size, setSize, isLoadingInitialData, isReachingEnd } =
    useRecipes(searchQuery, initialRecipes)

  return (
    <>
      <Head>
        <title>Dish Detective</title>
      </Head>
      <main className={styles.container}>
        <AutoComplete
          options={
            autocompleteQueries
              ? autocompleteQueries.map((query) => ({ value: query }))
              : [{ value: searchQuery }]
          }
          onSearch={debounce((data: string) => setSearch(data), 300)}
          onSelect={(data: string) => setSearch(data)}
          className={styles.searchBar}
        >
          <Input.Search
            size="large"
            placeholder="Search for recipes"
            allowClear
          />
        </AutoComplete>

        {isLoadingInitialData && (
          <div className={styles.spinContainer}>
            <Spin />
          </div>
        )}

        {recipes && (
          <InfiniteScroll
            dataLength={recipes.length}
            next={() => setSize(size + 1)}
            hasMore={!isReachingEnd}
            loader={
              <div className={styles.spinContainer}>
                <Spin />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              itemLayout="vertical"
              size="large"
              className={styles.recipesContainer}
              dataSource={recipes}
              renderItem={(item, index) => (
                <Link key={item.title} href={`/recipes/${item.id}`}>
                  <Card
                    hoverable
                    style={{ margin: '1rem 0' }}
                    cover={
                      <Image
                        src={item.image.url}
                        width={item.image.width || 312}
                        height={item.image.height || 231}
                        alt={item.title}
                        style={{ objectFit: 'cover', height: '250px' }}
                        priority={
                          index === 0
                        } /* Give priority to the item above-the-fold, for better LCP */
                      />
                    }
                  >
                    <Card.Meta title={item.title} />
                  </Card>
                </Link>
              )}
            />
          </InfiniteScroll>
        )}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes('', 0)
  return {
    props: { recipes },
  }
}
