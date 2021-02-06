export const parseYoutubeLink = (link: string) => {
  let videoId = link.split('v=')[1];
  let ampPosition = videoId.indexOf('&');
  if(ampPosition != -1) {
    videoId = videoId.substring(0, ampPosition);
  }

  return videoId;
}

export const videoDuration = (duration: number) : string => {
  // @ts-ignore
  return (new Date(duration * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}
