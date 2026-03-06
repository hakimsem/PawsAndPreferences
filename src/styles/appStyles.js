import { StyleSheet } from 'react-native';

const FOOTER_HEIGHT = 90;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  swiperContainer: {
    flex: 1,
    paddingBottom: FOOTER_HEIGHT + 40,
    overflow: 'hidden',
  },
  card: {
    flex: 0.7,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOpacity: 0.25,

    marginBottom: FOOTER_HEIGHT / 2,
    transform: [{ scale: 0.98 }],
  },
  backButtonBox: {
    marginTop: 10,
    marginLeft: 15,
    width: 90,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  favouriteButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  favouriteText: {
    fontWeight: '700',
    color: '#333',
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#555'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    position: 'absolute',
    bottom: 0,

    width: '100%',

    paddingHorizontal: 30,
    paddingVertical: 12,

    zIndex: 10,
    elevation: 10,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  dislikeBadge: { borderColor: '#FF4458' },
  likeBadge: { borderColor: '#17E3A1' },
  whiteText: { color: '#FFFFFF' },

  dislikeGlow: {
    backgroundColor: '#FF4458',
    shadowColor: '#FF4458',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    transform: [{ scale: 1.1 }],
  },
  likeGlow: {
    backgroundColor: '#17E3A1',
    shadowColor: '#17E3A1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    transform: [{ scale: 1.1 }],
  },
  dislikeText: {
    color: '#FF4458',
    fontWeight: '800',
  },
  likeText: {
    color: '#17E3A1',
    fontWeight: '800',
  },
  feedbackText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
    marginBottom: 10,
    minHeight: 30,
  },
  feedbackOverlay: {
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',

    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',

    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,

    fontSize: 18,
    fontWeight: '700',
  },
  binButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  binText: {
    fontSize: 20,
  },
});

export default styles;