import styles from '~styles/RecipeDetails.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecipe } from '~hooks/useRecipe'
import { Timeline, Skeleton, Row, Col, Anchor, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function RecipeDetails() {
  const router = useRouter()
  const { id } = router.query

  const {
    data: recipeDetails,
    isError,
    isLoading,
  } = useRecipe(String(id || '324694'))

  return (
    <>
      <Head>
        <title>{recipeDetails ? recipeDetails.title : 'Dish Detective'}</title>
      </Head>
      <main style={{ margin: '1rem 0' }}>
        <Breadcrumb style={{ margin: '0.5rem 1rem' }}>
          <Breadcrumb.Item>
            <Link href="/">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Recipe Item</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col span={16}>
            <div
              id="recipe"
              style={{ padding: '0 1rem', background: 'rgba(255,0,0,0.02)' }}
            >
              {recipeDetails ? (
                <>
                  <h1>{recipeDetails.title}</h1>
                  <div style={{ height: 350, position: 'relative' }}>
                    <Image
                      src={recipeDetails.image.url}
                      alt={recipeDetails.title}
                      priority
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </>
              ) : (
                <Skeleton />
              )}
            </div>
            <div
              id="instructions"
              style={{ padding: '0 1rem', background: 'rgba(0,255,0,0.02)' }}
            >
              {recipeDetails ? (
                <>
                  <h2 style={{ margin: '1rem 0' }}>Instructions</h2>
                  {recipeDetails.instructions.map((details) => (
                    <Timeline key={details.name}>
                      {details.name && (
                        <h3 style={{ fontWeight: 500 }}>{details.name}</h3>
                      )}
                      {details.steps.map((step) => (
                        <Timeline.Item key={step.step}>
                          {step.step}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  ))}
                </>
              ) : (
                <Skeleton />
              )}
            </div>
          </Col>
          <Col span={8}>
            <Anchor
              items={[
                {
                  key: 'part-1',
                  href: '#recipe',
                  title: 'Recipe',
                },
                {
                  key: 'part-2',
                  href: '#instructions',
                  title: 'Instructions',
                },
              ]}
            />
          </Col>
        </Row>
      </main>
    </>
  )
}
