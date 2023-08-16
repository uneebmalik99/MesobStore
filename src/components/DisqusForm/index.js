import { DiscussionEmbed } from 'disqus-react';

function DisqusForm() {
    const disqusShortname = 'Mesobstore';

    const disqusConfig = {
        url: 'https://Mesobstore.disqus.com/',
        identifier: '123',
        title: 'Mesobstore-post',
    };
    return (
        <div className="pt-[65px]">
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    );
}

export default DisqusForm;
