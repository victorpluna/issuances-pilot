import "./search-soulbounds.scss"
import { useCallback, useState } from "react"
import { Button, Empty, Form, Input, Row, Col, Spin } from "antd"
import { Column } from "react-display-flex"
import { useWeb3React } from "@web3-react/core"

import { ethers } from "ethers"
import { constants } from "../../../config/constants"
import { TokenCard } from "../../../components/TokenCard/TokenCard"
import abi from '../../../config/contract-abi.json'


export const SearchSoulbounds = () => {
  const { provider } = useWeb3React()
  const [tokens, setTokens] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const searchSoulboundTokens = useCallback(async ({ walletAddress }) => {
    setIsSearching(true)
    setTokens([])
    
    const contract = new ethers.Contract(constants.web3.contractAddress, abi, provider.getSigner())
    
    try {
      const foundTokens = await contract.getDocumentsFromWallet(walletAddress)
      console.log('foundTokens', foundTokens)
  
      setTokens(foundTokens)
    } catch (error) {
      console.log(error)
      setTokens([])
    }
    setIsSearching(false)
  }, [provider])

  return (
    <Column className="search-sbt" flex>
      <Form onFinish={searchSoulboundTokens}>
        <Row className="search-sbt-header" gutter={24}>
          <Col span="10">
            <Form.Item 
              name="walletAddress"
              label="Wallet address"
              rules={[{ required: true, message: 'Please input an wallet address' }]}
            >
              <Input placeholder="0x0397a823bfd50f6C1bbC17cfA0C6B38E463241AD" />
            </Form.Item>
          </Col>
          <Button loading={isSearching} type="primary" htmlType="submit">Search documents</Button>
        </Row>
      </Form>
      {isSearching && <Spin />}
      {tokens?.length === 0 ? <Empty description="There are no documents" /> : (
        <Row gutter={[16, 24]}>
          {tokens?.map(({ url, price }, index) => (
            <Col key={index} className="gutter-row" span={6}>
              <TokenCard tokenURI={url} price={price} />
            </Col>
          ))}
        </Row>
      )}
    </Column>
  )
}