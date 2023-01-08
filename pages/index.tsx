import styles from '~styles/Home.module.css'
import { useState, createElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRecipes } from '~hooks/useRecipes'
import { useRecipesAutocomplete } from '~hooks/useRecipesAutocomplete'
import {
  AutoComplete,
  List,
  Space,
  Spin,
  Input,
  Button,
  Row,
  Col,
  Card,
} from 'antd'
import { ClockCircleOutlined, HomeOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'
import InfiniteScroll from 'react-infinite-scroll-component'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

export default function Home() {
  const [searchQuery, setSearch] = useState<string>('')

  const { data: autocompleteQueries } = useRecipesAutocomplete(searchQuery)
  const { recipes, size, setSize, isLoadingInitialData, isReachingEnd } =
    useRecipes(searchQuery)

  return (
    <>
      <Head>
        <title>Dish Detective</title>
        <meta name="description" content="Find your next meal with ease." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <Row style={{ gap: '10px', alignItems: 'center', width: '100%' }}>
          <Col>
            <Button type="primary" icon={<HomeOutlined />} />
          </Col>
          <Col flex="auto">
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
          </Col>
        </Row>

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
                <Card hoverable style={{ margin: '1rem 0' }}>
                  <List.Item
                    key={item.title}
                    actions={[
                      ...(item.cookingMinutes > 0
                        ? [
                            <IconText
                              icon={ClockCircleOutlined}
                              text={`${item.cookingMinutes} minutes`}
                              key="list-vertical-star-o"
                            />,
                          ]
                        : []),
                    ]}
                    extra={
                      <Image
                        src={item.image.url}
                        width={item.image.width || 312}
                        height={item.image.height || 231}
                        alt={item.title}
                        priority={
                          index === 0
                        } /* Give priority to the item above-the-fold, for better LCP */
                      />
                    }
                  >
                    <List.Item.Meta title={<a>{item.title}</a>} />
                  </List.Item>
                </Card>
              )}
            />
          </InfiniteScroll>
        )}
      </main>
    </>
  )
}
