<?php
if( have_rows('modules') ):
	while ( have_rows('modules') ) : the_row();

		if ( get_row_layout() == 'insights_slider' ):
			if(get_sub_field('select_insights_category')):
        $term = get_sub_field('select_insights_category');
        $articleCategory = $term->slug;
        $articleCategoryName = $term->name;

        $insightsslider = array(
          'post_type' => 'insightsArticles',
          'post_count' => 3,
          'category_name' => $articleCategory,
          'meta_query' => array(
            'relation' => 'AND',
            'featured_clause' => array(
              'key' => 'featured',
              'compare' => 'EXISTS'
            )
          ),
          'orderby' => array(
            'featured_clause' => 'DESC',
            'date' => 'DESC'
          )
        );
		  endif;
		endif;

		if ( get_row_layout() == 'insights_list' ):
			if(get_sub_field('select_insights_list_category')):
        $term = get_sub_field('select_insights_list_category');
        $insightsListCategory = $term->slug;

        $insightslist = array(
          'post_type' => 'insightsArticles',
          'category_name' => $insightsListCategory,
          'meta_query' => array(
            'relation' => 'AND',
            'featured_clause' => array(
              'key' => 'featured',
              'compare' => 'EXISTS'
            )
          ),
          'orderby' => array(
            'featured_clause' => 'DESC',
            'date' => 'DESC'
          )
        );
		  endif;
		endif;

		if ( get_row_layout() == 'people_slider' ):
      $peopleslider = array( 'post_type' => 'bios' );
	  endif;

		if ( get_row_layout() == 'careers_listing' ):
      $careerlistingssea = array(
        'post_type' => 'careers',
        'meta_key' => 'office_location',
        'meta_value' => 'Seattle'
      );
      $careerlistingssf = array(
        'post_type' => 'careers',
        'meta_key' => 'office_location',
        'meta_value' => 'San Francisco'
      );
      $careerlistingssouix = array(
        'post_type' => 'careers',
        'meta_key' => 'office_location',
        'meta_value' => 'Souix Falls'
      );
	  endif;

	endwhile;
endif;


if (isset($articleCategoryName)) {
  $context['articleCategory'] = $articleCategoryName;
} else {
  $context['articleCategory'] = '';
}

if (isset($insightslist)) {
  $context['insightslist'] = Timber::get_posts($insightslist);
} else {
  $context['insightslist'] = '';
}

if (isset($insightsslider)) {
  $context['insightsslider'] = Timber::get_posts($insightsslider);
} else {
  $context['insightsslider'] = '';
}

if (isset($peopleslider)) {
  $context['peopleslider'] = Timber::get_posts($peopleslider);
} else {
  $context['peopleslider'] = '';
}

if (isset($careerlistingssea)) {
  $context['careerlistingssea'] = Timber::get_posts($careerlistingssea);
} else {
  $context['careerlistingssea'] = '';
}

if (isset($careerlistingssf)) {
  $context['careerlistingssf'] = Timber::get_posts($careerlistingssf);
} else {
  $context['careerlistingssf'] = '';
}

if (isset($careerlistingssouix)) {
  $context['careerlistingssouix'] = Timber::get_posts($careerlistingssouix);
} else {
  $context['careerlistingssouix'] = '';
}

$object = $wp_query->get_queried_object();
$parent_id  = $object->post_parent;
$depth = 0;
while ($parent_id > 0) {
  $page = get_page($parent_id);
  $parent_id = $page->post_parent;
  $depth++;
}

if ( isset( $_REQUEST[ 'search' ] ) ) {
  $context['searchTerm'] = $_REQUEST[ 'search' ];
  $context['insightsResults'] = '[ajax_load_more id="insights-landing" search="' . $_REQUEST[ 'search' ] . '" container_type="div" post_type="insightsArticles" category="" posts_per_page="10" scroll="false" transition_container="false" images_loaded="true" button_label="See More" button_loading_label="Loading..."]';
} else {
  $url = $_SERVER['REQUEST_URI'];
  $tokens = explode('/', $url);
  $currentcat = $tokens[sizeof($tokens)-2];

  if ($currentcat != 'insights') {
    $context['currentCategory'] = $currentcat;
    $context['insightsResults'] = '[ajax_load_more id="insights-landing" container_type="div" post_type="insightsArticles" category="' . $currentcat . '" posts_per_page="10" scroll="false" transition_container="false" images_loaded="true" button_label="See More" button_loading_label="Loading..."]';
  } else {
    $context['insightsResults'] = '[ajax_load_more id="insights-landing" container_type="div" post_type="insightsArticles" category="" posts_per_page="10" scroll="false" transition_container="false" images_loaded="true" button_label="See More" button_loading_label="Loading..."]';
  }
}

$businessAgilityChildrenArgs = array('post_type' => 'page', 'post_parent' => 443);
$context['businessAgilityChildren'] = Timber::get_posts($businessAgilityChildrenArgs);

$dataDrivenInsightsChildrenArgs = array('post_type' => 'page', 'post_parent' => 13);
$context['dataDrivenInsightsChildren'] = Timber::get_posts($dataDrivenInsightsChildrenArgs);

$customerIngenuityChildrenArgs = array('post_type' => 'page', 'post_parent' => 15);
$context['customerIngenuityChildren'] = Timber::get_posts($customerIngenuityChildrenArgs);

$technologyEnablementChildrenArgs = array('post_type' => 'page', 'post_parent' => 1773);
$context['technologyEnablementChildren'] = Timber::get_posts($technologyEnablementChildrenArgs);

$context['insights'] = Timber::get_posts(array('post_type' => 'insightsArticles'));
$context['categories'] = Timber::get_terms('category');
