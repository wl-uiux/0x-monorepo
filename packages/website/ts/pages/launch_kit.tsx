import * as _ from 'lodash';
import * as React from 'react';
import { Banner } from 'ts/components/banner';
import { Button } from 'ts/components/button';
import { CheckedLi, CheckedUl } from 'ts/components/checkmark_list';
import { Definition } from 'ts/components/definition';
import { DocumentTitle } from 'ts/components/document_title';
import { Hero } from 'ts/components/hero';
import { Section } from 'ts/components/newLayout';
import { ShowcaseSection } from 'ts/components/showcase_section';
import { SimpleDefinition } from 'ts/components/simple_definition';
import { SiteWrap } from 'ts/components/siteWrap';
import { Heading } from 'ts/components/text';
import { constants } from 'ts/utils/constants';
import { documentConstants } from 'ts/utils/document_meta_constants';

import { BackgroundMarquee } from '../components/background_marquee';
import { ModalContact } from '../components/modals/modal_contact';

const offersData = [
    {
        title: 'Accelerate Your Development',
        description:
            'Let Launch Kit take care of the complexities of building a relayer. The codebase allows you to connect to wallets, wrap ETH, make and take orders, and get notified of order state changes so you can spend more time on making your relayer your own.',
        showcaseUrl: 'images/launch_kit/relayer_screenshot.png',
        links: [
            {
                label: 'Get Started',
                url: `#`,
            },
            {
                label: 'Live Demo',
                url: `#`,
            },
        ],
    },
    {
        title: 'A Universe of Tokens',
        description:
            'Launch Kit supports all ERC-20 and ERC-721 tokens out of the box. Trade commodities with the ERC-20 exchange interface, or bid on crypto collectibles with the ERC-721 marketplace interface.',
        showcaseUrl: 'images/launch_kit/NFT_screenshot.png',
        links: [
            {
                label: 'Get Started',
                url: `#`,
            },
            {
                label: 'Live Demo',
                url: `#`,
            },
        ],
    },
];

const featuresList = [
    [
        'React UI for ERC-20 & ERC-721 tokens',
        'Market & Limit Orders',
        'Automatic Order Validation',
        'Order Status Notifications',
        'Dutch Auctions for ERC-721 tokens',
    ],
    [
        'Docker Image for One-Click Deploy',
        'Standard Relayer API for Sharing Orders',
        'Wrapped ETH Abstraction for Easy Market Buys',
        'Works with Any Web3-Providing Wallet',
    ],
];

export class NextLaunchKit extends React.Component {
    public state = {
        isContactModalOpen: false,
    };
    public render(): React.ReactNode {
        return (
            <SiteWrap>
                <DocumentTitle {...documentConstants.LAUNCH_KIT} />
                <Hero
                    isLargeTitle={true}
                    isFullWidth={true}
                    title="0x Launch Kit"
                    description="Launch a relayer in under a minute"
                    background={<BackgroundMarquee imgSrcUrl="images/launch_kit/background_marquee.png" />}
                    actions={<HeroActions />}
                    sectionPadding={'120px 0 180px 0'}
                />

                <Section bgColor="dark" isFlex={true} maxWidth="1170px">
                    <Definition
                        title="Networked Liquidity Pool"
                        titleSize="small"
                        description="Tap into and share liquidity with other relayers"
                        icon="networkedLiquidity"
                        iconSize="medium"
                        isInline={true}
                    />

                    <Definition
                        title="Extensible Code Repo"
                        titleSize="small"
                        description="Fork and extend to support modes of exchange"
                        icon="code-repo"
                        iconSize="medium"
                        isInline={true}
                    />

                    <Definition
                        title="Exchange Ethereum based Tokens"
                        titleSize="small"
                        description="Enable trading for any ERC-20 or ERC-721 asset"
                        icon="eth-based-tokens"
                        iconSize="medium"
                        isInline={true}
                    />
                </Section>

                {_.map(offersData, (item, index) => (
                    <ShowcaseSection
                        maxWidth="1170px"
                        showcaseImgSrc={item.showcaseUrl}
                        paddingMobile={index === 0 ? '80px 0 40 0' : '40px 0'}
                        sectionPadding={index === 0 ? '160px 0 80px 0' : '80px 0'}
                    >
                        <SimpleDefinition
                            key={`offers-${index}`}
                            title={item.title}
                            description={item.description}
                            actions={item.links}
                        />
                    </ShowcaseSection>
                ))}

                <Section maxWidth="1170px" isFlex={true}>
                    <Heading size={42}>Features</Heading>
                    {_.map(featuresList, (details: string[], listIndex: number) => (
                        <CheckedUl key={`features-list-${listIndex}`}>
                            {_.map(details, (detail: string, detailIndex: number) => (
                                <CheckedLi>{detail}</CheckedLi>
                            ))}
                        </CheckedUl>
                    ))}
                </Section>
                <Banner
                    heading="Need more flexibility?"
                    subline="Dive into our docs, or contact us if needed"
                    mainCta={{
                        text: 'Get Started',
                        href: `${constants.URL_LAUNCH_KIT_BACKEND}/#table-of-contents`,
                        shouldOpenInNewTab: true,
                    }}
                    secondaryCta={{ text: 'Get in Touch', onClick: this._onOpenContactModal.bind(this) }}
                />
                <ModalContact isOpen={this.state.isContactModalOpen} onDismiss={this._onDismissContactModal} />
            </SiteWrap>
        );
    }

    public _onOpenContactModal = (): void => {
        this.setState({ isContactModalOpen: true });
    };

    public _onDismissContactModal = (): void => {
        this.setState({ isContactModalOpen: false });
    };
}

const HeroActions = () => (
    <React.Fragment>
        <Button href={constants.URL_LAUNCH_KIT_BACKEND} isInline={true} target="_blank">
            Get Started
        </Button>
        <Button
            href={constants.URL_LAUNCH_KIT_BLOG_POST}
            transparentBgColor={'#000000'}
            isTransparent={true}
            isInline={true}
            target="_blank"
        >
            Learn More!
        </Button>
    </React.Fragment>
);
