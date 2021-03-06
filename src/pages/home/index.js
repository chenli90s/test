import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Icon, Balloon } from '@alifd/next';
import './style.scss';
import http from '../../http';
import YSL from '../../assert/ysl.jpeg';
import rog from '../../assert/rog.jpg';
import bot from '../../assert/bot.jpg';

class Home extends Component {
  icons = {
    gucci: 'https://res.gucci.cn/images/icon/GG_Icon_iOS_288.png',
    chloe: 'https://media.yoox.biz/ytos/resources/CHLOE/favicon/apple-icon-precomposed.png',
    celine: 'https://www.celine.com/on/demandware.static/Sites-Celine_NONTRANSAC_V2-Site/-/default/dwe09013be/images/favicon.ico',
    miumiu: 'https://www.miumiu.com/etc.clientlibs/miumiu/clientlibs/miumiu/clientlib-all/resources/favicon.ico',
    loewe: 'https://www.loewe.com/on/demandware.static/Sites-LOE_CHN-Site/-/default/dw6a6be4cd/images/favicon.ico',
    bottegaveneta: bot,
    versace: 'https://www.versace.cn/on/demandware.static/Sites-CN-Site/-/default/dw01f1cdf0/images/favicon-152.png',
    prada: 'https://www.prada.com/etc/designs/prada_china/favicon.ico',
    stuartweitzman: 'https://www.stuartweitzman.com/favicon.ico',
    fendi: 'https://www.fendi.cn/dist/favicon.ico',
    valentino: 'https://bztic-casaba-creator.oss-cn-shanghai.aliyuncs.com/c5150f3b8de7f0a10313cf6e323e42db/1572616883167mig.ico',
    balenciaga: 'https://www.balenciaga.com/ytos/resources/BALENCIAGA/images/touch-icons/apple-touch-icon-152x152-precomposed.png',
    ysl: YSL,
    burberry: 'https://cn.burberry.com/images/favicons/180x180.png',
    rogervivier: rog,
    maxmara: 'https://dx0woejilafh2.cloudfront.net/docroot/maxmara/2019.503.1214-3/public/favicons/apple-touch-icon.png',
  };

  state = {
    spiders: [],
  };

  componentWillMount = async () => {
    const res = await http.get('/spiders');
    if (res && res.code === -1) {
      // this.props.history.push('/login');
      return;
    }
    if (res) {
      this.setState({ spiders: res.data });
    }

    // console.log(res);
  };

  componentDidMount = async () => {
    let resp = await http.get('/spiders');
    if (resp && resp.code === -1) {
      this.props.history.push('/account/login');
      return;
    }
    this.c = setInterval(async () => {
      resp = await http.get('/spiders');
      if (resp && resp.code === -1) {
        this.props.history.push('/account/login');
        clearInterval(this.c);
        return;
      }
      if (resp) {
        this.setState({ spiders: resp.data });
      }
    }, 5000);
  };


  render() {
    // const names = Object.keys(this.icons);
    // let keys = [];
    // if (this.state.status) {
    //   keys = Object.keys(this.state.status);
    // }
    // console.log(keys)
    const  {spiders} = this.state
    return (
      <IceContainer style={{ marginTop: 40 }}>
        <div className="apps">
          {
            spiders.map(({name, status}, index) => {
              return (
                <div className="app"
                  key={index}
                >
                  <img src={this.icons[name]} alt="" />
                  <h3>{!status ? <Button size="small"
                    type="secondary"
                    onClick={async (e) => {
                                await http.get('/start', { name });
                                let resp = await http.get('/spiders');
                                if (resp) {
                                  this.setState({ spiders: resp.data });
                                }
                              }}
                  ><Icon type="download" />启动爬虫
                  </Button> : <div className="runs">
                                                    <span className="running">
                      <Icon type="loading" />爬取中...
                    </span>
                                                    <Button size="small"
                      type="normal"
                      warning
                      onClick={async () => {
                                await http.get('/start', { name });
                                let resp = await http.get('/spiders');
                                if (resp) {
                                  this.setState({ spiders: resp.data });
                                }
                              }}
                    ><Icon type="refresh" />重新启动
                    </Button>
                                                              </div>}
                  </h3>
                  <Balloon trigger={<Button onClick={() => {
                    this.props.history.push(`/data/${name}`);
                  }}
                  >{name}
                  </Button>}
                    closable={false}
                  >查看数据
                  </Balloon>
                </div>
              );
            })
          }
        </div>
      </IceContainer>
    );
  }
}


export default Home;
