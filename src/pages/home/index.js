import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Icon, Balloon } from '@alifd/next';
import './style.scss';
import http from '../../http';

class Home extends Component {
  icons = {
    gucci: 'https://res.gucci.cn/images/icon/GG_Icon_iOS_288.png',
    chloe: 'https://media.yoox.biz/ytos/resources/CHLOE/favicon/apple-icon-precomposed.png',
    celine: 'https://www.celine.com/on/demandware.static/Sites-Celine_NONTRANSAC_V2-Site/-/default/dwe09013be/images/favicon.ico',
    miumiu: 'https://www.miumiu.com/etc/designs/miumiu/assets/favicon.ico',
    loewe: 'https://www.loewe.com/on/demandware.static/Sites-LOE_CHN-Site/-/default/dw6a6be4cd/images/favicon.ico',
    bottegaveneta: 'https://store.bottegaveneta.cn/favicon.ico',
    versace: 'https://www.versace.cn/on/demandware.static/Sites-CN-Site/-/default/dw01f1cdf0/images/favicon-152.png',
    prada: 'https://www.prada.com/etc/designs/prada_china/favicon.ico',
    stuartweitzman: 'https://www.stuartweitzman.com/favicon.ico',
    fendi: 'https://www.fendi.cn/favicon.ico',
    valentino: 'https://www.valentino.cn/ytos/resources/VALENTINO/images/favicon/android-icon-192x192.png',
    balenciaga: 'https://www.balenciaga.com/ytos/resources/BALENCIAGA/images/touch-icons/apple-touch-icon-152x152-precomposed.png',
    ysl: 'https://www.ysl.com/favicon.ico',
    burberry: 'https://cn.burberry.com/images/favicons/180x180.png',
    rogervivier: 'http://www.rogervivier.cn/etc/designs/rogervivier/img/favicon/favicon-196x196.png',
    maxmara: 'https://dx0woejilafh2.cloudfront.net/docroot/maxmara/2019.503.1214-3/public/favicons/apple-touch-icon.png',
  };

  state = {
    status: {},
  };

  componentWillMount = async () => {
    const res = await http.get('/spiders');
    if (res && res.code === -1) {
      // this.props.history.push('/login');
      return;
    }
    if (res) {
      this.setState({ status: res.data });
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
      if(resp){
        this.setState({ status: resp.data });
      }
    }, 5000);
  };


  render() {
    // const names = Object.keys(this.icons);
    let keys = [];
    if (this.state.status) {
      keys = Object.keys(this.state.status);
    }

    return (
      <IceContainer style={{ marginTop: 40 }}>
        <div className="apps">
          {
            keys.map((name, index) => {
              return (
                <div className="app"
                  key={index}
                >
                  <img src={this.icons[name]} alt="" />
                  <h3>{!this.state.status[name] ? <Button size="small"
                    type="secondary"
                    onClick={async () => {
                                                            await http.get('/start', { name });
                                                            const status = this.state.status;
                                                            status[name] = true;
                                                            this.setState({ status });
                                                          }}
                  ><Icon type="download" />启动爬虫
                  </Button> : <span className="running"><Icon type="loading" />爬取中...</span>}
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
