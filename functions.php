<?php
	/**
	 * Starkers functions and definitions
	 *
	 * For more information on hooks, actions, and filters, see http://codex.wordpress.org/Plugin_API.
	 *
 	 * @package 	WordPress
 	 * @subpackage 	Wordpress Boilerplate Theme
 	 * @since 		Wordpress Boilerplate Theme 1.0
	 */

	/* ========================================================================================================================

	Required external files

	======================================================================================================================== */

	require_once( 'external/starkers-utilities.php' );

	/* ========================================================================================================================

	Theme specific settings

	Uncomment register_nav_menus to enable a single menu with the title of "Primary Navigation" in your theme

	======================================================================================================================== */

	add_theme_support('post-thumbnails');

	// register_nav_menus(array('primary' => 'Primary Navigation'));

	/* ========================================================================================================================

	Actions and Filters

	======================================================================================================================== */

	// I'm going to do this in the header/footer template instead.
	// add_action( 'wp_enqueue_scripts', 'starkers_script_enqueuer' );

	add_filter( 'body_class', array( 'Starkers_Utilities', 'add_slug_to_body_class' ) );

	/* ========================================================================================================================
	
	Custom Theme Options Page
	
	======================================================================================================================== */
	if( function_exists('acf_add_options_page') ) {
		
		acf_add_options_page(array(
			'page_title' 	=> 'Theme General Settings',
			'menu_title'	=> 'Theme Settings',
			'menu_slug' 	=> 'theme-general-settings',
			'capability'	=> 'edit_posts',
			'redirect'		=> false
		));
				
	}
	
	/* ========================================================================================================================

	Custom Post Types - include custom post types and taxonimies here e.g.

	e.g. require_once( 'custom-post-types/your-custom-post-type.php' );

	======================================================================================================================== */

	function create_posttype() {
		register_post_type( 'insightsArticles',
			// CPT Options
			array(
				'labels' => array(
					'name' => __('Insights'),
					'singlular' => __('Insight')
				),
				'public' => true,
				'has_archive' => true,
				'rewrite' => array(
					'slug' => 'insights-articles',
					'with_front' => false
				),
				'taxonomies' => array('category')
			)
		);

		register_post_type( 'bios',
			// CPT Options
			array(
				'labels' => array(
					'name' => __('Bios'),
					'singlular' => __('Bio')
				),
				'public' => true,
				'has_archive' => true,
				'rewrite' => array(
					'slug' => 'people-bios',
					'with_front' => false
				),
				'menu_icon' => 'dashicons-format-aside',
			)
		);

		register_post_type( 'careers',
			// CPT Options
			array(
				'labels' => array(
					'name' => __('Careers'),
					'singlular' => __('Career')
				),
				'public' => true,
				'has_archive' => true,
				'rewrite' => array(
					'slug' => 'career-postings',
					'with_front' => false
				),
				'menu_icon' => 'dashicons-businessman',
			)
		);
	}

	function insights_tax_init() {
		// create a new taxonomy
		register_taxonomy(
			'insights_cats',
			'insightsArticles',
			array(
				'hierarchical' => true,
				'show_ui' => true,
				'label' => __( 'Insights Categories' ),
				'query_var' => true,
				'rewrite' => array( 'slug' => 'insights-catagories' )
			)
		);

		flush_rewrite_rules();
	}

	add_action('init', 'create_posttype');
	add_action( 'init', 'insights_tax_init' );


	/* ========================================================================================================================

	Customize Admin Menu

	======================================================================================================================== */

	function custom_menu_page_removing() {
	    remove_menu_page( 'edit.php' );
	    remove_menu_page( 'edit-comments.php' );
	}
	add_action( 'admin_menu', 'custom_menu_page_removing' );


	/* ========================================================================================================================

	TIMBER

	======================================================================================================================== */

	if ( ! class_exists( 'Timber' ) ) {
		add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
		});

		add_filter('template_include', function($template) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		});

		return;
	}

	Timber::$dirname = array('templates', 'views');


	class StarterSite extends TimberSite {

		function __construct() {
			add_theme_support( 'post-formats' );
			add_theme_support( 'post-thumbnails' );
			add_theme_support( 'menus' );
			add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
			add_filter( 'timber_context', array( $this, 'add_to_context' ) );
			add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
			add_action( 'init', array( $this, 'register_post_types' ) );
			add_action( 'init', array( $this, 'register_taxonomies' ) );
			parent::__construct();
		}

		function register_post_types() {
			//this is where you can register custom post types
		}

		function register_taxonomies() {
			//this is where you can register custom taxonomies
		}

		function add_to_context( $context ) {
			$context['env'] = WP_ENV;
			// $context['foo'] = 'bar';
			// $context['stuff'] = 'I am a value set in your functions.php file';
			// $context['notes'] = 'These values are available everytime you call Timber::get_context();';
			$context['menu'] = new TimberMenu('Global Navigation');
			$context['social'] = new TimberMenu('Social Navigation');
    		$context['options'] = get_fields('option');
			$context['site'] = $this;
			return $context;
		}

		function myfoo( $text ) {
			$text .= ' bar!';
			return $text;
		}

		function add_to_twig( $twig ) {
			/* this is where you can add your own functions to twig */
			$twig->addExtension( new Twig_Extension_StringLoader() );
			$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
			return $twig;
		}

	}

	new StarterSite();


	/* ========================================================================================================================

	TinyMCE Custom Styles

	======================================================================================================================== */

	// Callback function to insert 'styleselect' into the $buttons array
	function my_mce_buttons_2( $buttons ) {
		array_unshift( $buttons, 'styleselect' );
		return $buttons;
	}

	// Only allow desired block level elements
	function editmce($arr){
	    $arr['block_formats'] = 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;';
	    return $arr;
	}

	// Callback function to filter the MCE settings
	function my_mce_before_init_insert_formats( $init_array ) {
		// Define the style_formats array
		$style_formats = array(
			// Each array child is a format with it's own settings
			array(
				'title' => 'Level 1 Header',
				'inline' => 'span',
				'classes' => 'level-1',
				'wrapper' => true,
			),
			array(
				'title' => 'Level 2 Header',
				'inline' => 'span',
				'classes' => 'level-2',
				'wrapper' => true,
			),
			array(
				'title' => 'Level 3 Header',
				'inline' => 'span',
				'classes' => 'level-3',
				'wrapper' => true,
			),
			array(
				'title' => 'Level 4 Header',
				'inline' => 'span',
				'classes' => 'level-4',
				'wrapper' => true,
			),
			array(
				'title' => 'Level 5 Header',
				'inline' => 'span',
				'classes' => 'level-5',
				'wrapper' => true,
			),
			array(
				'title' => 'Level 5 Full Width',
				'inline' => 'span',
				'classes' => 'full-width-level-5',
				'wrapper' => true,
			),
			array(
				'title' => 'Hanging Header',
				'inline' => 'span',
				'classes' => 'hanging-header',
				'wrapper' => true,
			),
			array(
				'title' => 'Trailing Line',
				'inline' => 'span',
				'classes' => 'trailing-line',
				'wrapper' => true,
			),
			array(
				'title' => 'Large Paragraph',
				'block' => 'p',
				'classes' => 'large',
				'wrapper' => false,
			),
			array(
				'title' => 'Underline',
				'inline' => 'span',
				'classes' => 'underline',
				'wrapper' => true,
			)
		);

		// Insert the array, JSON ENCODED, into 'style_formats'
		$init_array['style_formats'] = json_encode( $style_formats );
		return $init_array;
	}

	function my_mce4_options($init) {
	    $custom_colours = '
	        "143250", "Navy",
	        "1dc2bb", "Aqua",
	        "ffffff", "White",
	        "e6e6e6", "Light Gray",
	        "c2c2c2", "Gray",
	        "69747c", "Dark Gray",
	        "000000", "Black",
	        "fced1e", "Yellow",
	    ';

	    // build colour grid default+custom colors
	    $init['textcolor_map'] = '['.$custom_colours.']';

	    // change the number of rows in the grid if the number of colors changes
	    // 8 swatches per row
	    $init['textcolor_rows'] = 1;

	    return $init;
	}

	function my_theme_add_editor_styles() {
	  add_editor_style( 'custom-editor-styles.css' );
	}
	add_action( 'init', 'my_theme_add_editor_styles' );

	// Register our callback to the appropriate filter
	add_filter('mce_buttons_2', 'my_mce_buttons_2');
	add_filter('tiny_mce_before_init', 'editmce');
	add_filter('tiny_mce_before_init', 'my_mce_before_init_insert_formats');
	add_filter('tiny_mce_before_init', 'my_mce4_options');
  
  
	/* ========================================================================================================================

	Allow SVG

	======================================================================================================================== */
    
  function cc_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
  }
  add_filter('upload_mimes', 'cc_mime_types');  
  